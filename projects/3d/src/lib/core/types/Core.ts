import { WebGPUEngine } from "@babylonjs/core/Engines/webgpuEngine.js";
import { Engine } from "@babylonjs/core/Engines/engine.js";
import { Scene } from "@babylonjs/core/scene.js";

import type { ContainerProxy } from "$lib/core/types/ContainerProxy";

type Callable = () => void;

export class Core {
    readonly canvas: HTMLCanvasElement;
    readonly engine: Engine;
    readonly scene: Scene;
    fsui: ContainerProxy | null;

    readonly render: Callable;
    readonly renderLoopStart: Callable;
    readonly renderLoopStop: Callable;

    readonly resize: Callable;

    readonly #renderFunc: Callable;
    #renderCount: number;
    #loopEnabled: number;
    #frame: number | null;

    destroy() {
        this.#loopEnabled = 0;
        if (this.#frame != null) {
            cancelAnimationFrame(this.#frame);
            this.#frame = null;
        }
        this.engine.dispose();
    }

    constructor(canvas: HTMLCanvasElement, webgpu: boolean) {
        this.#frame = null;
        this.#loopEnabled = 0;
        this.#renderCount = 0;

        this.#renderFunc = () => {
            console.log("render frame");
            if (this.scene.activeCamera) {
                if (this.#renderCount > 0) {
                    this.#renderCount -= 1;
                }
                this.scene.render(false, true);

                if (this.#loopEnabled > 0 || this.#renderCount > 0) {
                    this.#frame = requestAnimationFrame(this.#renderFunc);
                    return;
                }
            }
            this.#frame = null;
        };

        this.render = () => {
            this.#renderCount = 2;
            if (null == this.#frame) {
                this.#frame = requestAnimationFrame(this.#renderFunc);
            }
        };

        this.renderLoopStart = () => {
            this.#loopEnabled += 1;
            this.render();
        };

        this.renderLoopStop = () => {
            this.#loopEnabled -= 1;
        };

        this.resize = () => {
            this.engine.resize();
            this.render();
        };

        this.canvas = canvas;
        if (webgpu) {
            this.engine = new WebGPUEngine(this.canvas, { antialiasing: true });
        } else {
            this.engine = new Engine(this.canvas, true);
        }
        this.scene = new Scene(this.engine);
        this.scene.onReadyObservable.addOnce(this.render);
        this.fsui = null;
    }
}
