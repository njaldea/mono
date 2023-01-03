/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 *  See License.txt in https://github.com/microsoft/vscode/blob/main/LICENSE.txt
 *--------------------------------------------------------------------------------------------*/

/*
 *  This implementation is inspired by:
 *      https://github.com/microsoft/vscode/blob/main/src/vs/base/common/fuzzyScorer.ts
 *
 *  It is simplified to fit the use case for @nil-/doc
 */

const isUpper = (code: number) => {
    // A == 65
    // Z == 90
    return 65 <= code && code <= 90;
};

const scoreSeparatorAtPos = (charCode: number) => {
    switch (charCode) {
        case 47: // Slash
            // prefer path separators...
            return 5;
        case 95: // Underline
        case 45: // Dash
        case 46: // Period
        case 32: // Space
        case 58: // Colon:
            // ...over other separators
            return 4;
        default:
            return 0;
    }
};

const computeCharScore = (
    queryCharAtIndex: string,
    queryLowerCharAtIndex: string,
    target: string,
    targetLower: string,
    targetIndex: number,
    matchesSequenceLength: number
) => {
    let score = 0;

    if (queryLowerCharAtIndex !== targetLower[targetIndex]) {
        // no match of characters
        return score;
    }

    // Character match bonus
    score += 1;

    // Consecutive match bonus
    if (matchesSequenceLength > 0) {
        score += matchesSequenceLength * 5;
    }

    // Same case bonus
    if (queryCharAtIndex === target[targetIndex]) {
        score += 1;
    }

    // Start of word bonus
    if (0 === targetIndex) {
        score += 8;
    } else {
        const separatorBonus = scoreSeparatorAtPos(target.charCodeAt(targetIndex - 1));
        if (separatorBonus) {
            score += separatorBonus;
        } else if (isUpper(target.charCodeAt(targetIndex)) && 0 === matchesSequenceLength) {
            score += 2;
        }
    }

    return score;
};

const doScoreFuzzy = (
    query: string,
    queryLower: string,
    queryLength: number,
    target: string,
    targetLower: string,
    targetLength: number
) => {
    const scores: number[] = [];
    const matches: number[] = [];

    for (let queryIndex = 0; queryIndex < queryLength; queryIndex++) {
        const queryIndexOffset = queryIndex * targetLength;
        const queryIndexPreviousOffset = queryIndexOffset - targetLength;

        const queryIndexGtNull = queryIndex > 0;

        const queryCharAtIndex = query[queryIndex];
        const queryLowerCharAtIndex = queryLower[queryIndex];

        for (let targetIndex = 0; targetIndex < targetLength; targetIndex++) {
            const targetIndexGtNull = targetIndex > 0;

            const currentIndex = queryIndexOffset + targetIndex;
            const leftIndex = currentIndex - 1;
            const diagIndex = queryIndexPreviousOffset + targetIndex - 1;

            const leftScore = targetIndexGtNull ? scores[leftIndex] : 0;
            const diagScore = queryIndexGtNull && targetIndexGtNull ? scores[diagIndex] : 0;

            const matchesSequenceLength =
                queryIndexGtNull && targetIndexGtNull ? matches[diagIndex] : 0;

            const score =
                !diagScore && queryIndexGtNull
                    ? 0
                    : computeCharScore(
                          queryCharAtIndex,
                          queryLowerCharAtIndex,
                          target,
                          targetLower,
                          targetIndex,
                          matchesSequenceLength
                      );

            const isValidScore = score && diagScore + score >= leftScore;
            if (isValidScore) {
                matches[currentIndex] = matchesSequenceLength + 1;
                scores[currentIndex] = diagScore + score;
            } else {
                matches[currentIndex] = 0;
                scores[currentIndex] = leftScore;
            }
        }
    }

    const positions = [];
    let queryIndex = queryLength - 1;
    let targetIndex = targetLength - 1;
    while (queryIndex >= 0 && targetIndex >= 0) {
        const currentIndex = queryIndex * targetLength + targetIndex;
        const match = matches[currentIndex];
        if (0 === match) {
            targetIndex--;
        } else {
            positions.push(targetIndex);

            queryIndex--;
            targetIndex--;
        }
    }

    return [scores[queryLength * targetLength - 1] ?? 0, positions.reverse()] as const;
};

export const score = (target: string, query: string) => {
    const targetLength = target.length;
    const queryLength = query.length;

    if (targetLength < queryLength) {
        return [0, []] as [number, number[]];
    }

    return doScoreFuzzy(
        query,
        query.toLowerCase(),
        queryLength,
        target,
        target.toLowerCase(),
        targetLength
    );
};

export const fuzz = (target: string, query: string): boolean => {
    return score(target, query)[0] > 0;
};
