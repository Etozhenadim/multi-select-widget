import { makeAutoObservable } from "mobx";
import { ElementI } from "@/types/elements";
import { selectedElementsStore } from "@/stores/selectedElementsStore";

export class DialogStore {
  sourceElements: ElementI[];
  selectedElements: ElementI[] = [];
  searchTerm: string = "";
  filterValue: number | null = null;

  constructor(sourceElements: ElementI[]) {
    this.sourceElements = sourceElements;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setSearchTerm(value: string) {
    this.searchTerm = value;
  }

  setFilterValue(value: number | null) {
    this.filterValue = value;
  }

  get normalizedSearch(): string {
    return this.searchTerm.toLowerCase();
  }

  get idToLowerLabel(): Map<number, string> {
    const map = new Map<number, string>();
    for (const el of this.sourceElements) {
      map.set(el.id, el.label.toLowerCase());
    }
    return map;
  }

  get selectedIdSet(): Set<number> {
    return new Set(this.selectedElements.map((e) => e.id));
  }

  get canSelectMore(): boolean {
    return this.selectedElements.length < 3;
  }

  isSelected(id: number): boolean {
    return this.selectedIdSet.has(id);
  }

  get filteredElements(): ElementI[] {
    const n = this.normalizedSearch;
    const fv = this.filterValue;
    const lowerMap = this.idToLowerLabel;
    return this.sourceElements.filter((el) => {
      const lower = lowerMap.get(el.id) ?? "";
      const matchesSearch = lower.includes(n);
      const matchesFilter = fv ? el.id > fv : true;
      return matchesSearch && matchesFilter;
    });
  }

  toggle(item: ElementI) {
    const idx = this.selectedElements.findIndex((el) => el.id === item.id);
    if (idx !== -1) {
      // remove by index to avoid full reallocation
      this.selectedElements.splice(idx, 1);
      return;
    }
    if (this.canSelectMore) {
      this.selectedElements.push(item);
    }
  }

  remove(id: number) {
    const idx = this.selectedElements.findIndex((el) => el.id === id);
    if (idx !== -1) {
      this.selectedElements.splice(idx, 1);
    }
  }

  save() {
    selectedElementsStore.setElements(this.selectedElements.slice());
  }
} 