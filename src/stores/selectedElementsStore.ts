import { makeAutoObservable } from "mobx";
import { ElementI } from "@/types/elements";

class SelectedElementsStore {
  data: ElementI[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setElements(items: ElementI[]) {
    this.data = items;
  }

  removeElementById(id: number) {
    const indexToRemove = this.data.findIndex((element: ElementI) => element.id === id);
    if (indexToRemove !== -1) {
      this.data.splice(indexToRemove, 1);
    }
  }
}

export const selectedElementsStore = new SelectedElementsStore();
