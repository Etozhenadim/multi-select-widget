"use client";
import React, {useState, useMemo} from "react";
import {SelectedList, Dialog} from "@/components";
export default function Widget() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Simulating a large list of elements
  const elementsList = useMemo(
    () =>
      Array.from({length: 300}, (_, i) => ({
        id: i + 1,
        label: `Element ${i + 1}`,
      })),
    []
  );

  return (
    <main className="font-sans flex items-center justify-center min-h-screen w-full p-4 bg-zinc-950">
      <div className="flex flex-col items-start gap-4 bg-zinc-900 text-white p-4 size-full max-w-[520px] rounded-md border border-zinc-800">
        <h1 className="text-base font-medium text-zinc-200">Select Items</h1>
        <SelectedList />
        <button
          onClick={() => setIsDialogOpen(!isDialogOpen)}
          className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 px-3 py-2 text-white rounded"
        >
          Change my choice
        </button>

        {isDialogOpen && (
          <Dialog
            setIsDialogOpen={setIsDialogOpen}
            elementsList={elementsList}
          />
        )}
      </div>
    </main>
  );
}
