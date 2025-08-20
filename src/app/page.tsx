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
    <main className="font-sans flex items-center justify-center h-screen w-full p-8 gap-16">
      <div className="flex flex-col items-start gap-5 bg-white text-black p-5 size-full max-w-[514px] rounded-lg shadow-lg">
        <h1 className="text-lg font-medium">Select Items</h1>
        <SelectedList />
        <button
          onClick={() => setIsDialogOpen(!isDialogOpen)}
          className="bg-green-600 px-2 py-1 text-white"
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
