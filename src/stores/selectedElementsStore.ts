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
    this.data = this.data.filter((element: ElementI) => element.id !== id);
  }
}

export const selectedElementsStore = new SelectedElementsStore();
