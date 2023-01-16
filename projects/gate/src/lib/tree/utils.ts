type Impl<IN extends unknown[], OUT extends unknown[]> = (...values: IN) => OUT;

export const debounce = <IN extends unknown[], OUT extends unknown[]>(
    cb: Impl<IN, OUT>,
    timeout = 1000
) => {
    let rejection: null | ((reason?: unknown) => void) = null;
    let identifier: null | ReturnType<typeof setTimeout> = null;

    return async (...v: IN) => {
        return new Promise<OUT>((resolve, reject) => {
            if (identifier && rejection) {
                clearTimeout(identifier);
                rejection("debounced");
            }

            rejection = reject;
            identifier = setTimeout(() => {
                identifier = null;
                resolve(cb(...v));
            }, timeout);
        });
    };
};

export const delayed = <IN extends unknown[], OUT extends unknown[]>(
    cb: Impl<IN, OUT>,
    timeout = 1000
) => {
    return (...v: IN) => {
        return new Promise<OUT>((resolve) => {
            setTimeout(() => resolve(cb(...v)), timeout);
        });
    };
};
