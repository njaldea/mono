/**
 * To emulate c++ RAII where children are destroyed first before the parent.
 *
 * onMount and onDestroy from svelte mirrors each other, which is designed
 * to handle DOM element existence properly.
 *
 * In @nil-/3d, it is much intuitive that the children are destroyed first
 * before the parent to cleanup the children first. It is to mirror the order
 * of constructor call (script tag)
 * To do this, the destructor interface masks it to reorder the destroy calls.
 */
export class Destructor {
    private parent: null | Destructor;
    private children: Destructor[];
    private destroyed: boolean;
    private cb: () => void;

    constructor(cb: () => void) {
        this.parent = null;
        this.children = [];
        this.destroyed = false;
        this.cb = cb;
    }

    public add(child: Destructor) {
        child.parent = this;
        this.children.push(child);
    }

    public remove(child: Destructor) {
        this.children = this.children.filter((v) => v !== child);
    }

    public call() {
        // flag is necessary for the case that a A -> B -> C
        // if A is destroyed, the destructor mechanism will call C -> B -> A
        // but the, svelte's onDestroy will call the callbacks A -> B -> C
        // once destructor.call is invoked, the svelte's onDestroy lifecycle
        // should be bypassed.
        if (!this.destroyed) {
            this.destroyed = true;
            const children = [...this.children].reverse();
            for (const child of children) {
                child.call();
            }

            if (this.cb) {
                this.cb();
            }
        }
        this.parent?.remove(this);
    }
}
