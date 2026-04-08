import { Buffer } from "buffer";
import { spawn, ChildProcessWithoutNullStreams } from "child_process";

let processRef: ChildProcessWithoutNullStreams | null = null;

export function setRecipe() {
  if (processRef) return;
  processRef = spawn("python", ["recipe/setRecipe.py"]);

  processRef.stdout.on("data", (d: Buffer) => {
    console.log("[SetRecipe]", d.toString());
  });

    processRef.stderr.on("data", (d: Buffer) => {
    console.error("[SetRecipe ERROR]", d.toString());
  });

  processRef.on("close", () => {
    processRef = null;
  });
}

export function turnOffjetsinter() {
  if (processRef) return;

  processRef = spawn("python", ["jetsinter/turnOffJetsinter.py"]);

  processRef.stdout.on("data", (d: Buffer) => {
    console.log("[SetJetsinter]", d.toString());
  });

    processRef.stderr.on("data", (d: Buffer) => {
    console.error("[SetJetsinter ERROR]", d.toString());
  });

  processRef.on("close", () => {
    processRef = null;
  });
}

export function setJetsinter() {
  if (processRef) return;

  processRef = spawn("python", ["jetsinter/setJetsinter.py"]);

  processRef.stdout.on("data", (d: Buffer) => {
    console.log("[Setjetsinter]", d.toString());
  });

    processRef.stderr.on("data", (d: Buffer) => {
    console.error("[Setjetsinter ERROR]", d.toString());
  });

  processRef.on("close", () => {
    processRef = null;
  });
}

export function start() {
  if (processRef) return;

  processRef = spawn("python", ["chart.py"]);

  processRef.stdout.on("data", (d: Buffer) => {
    console.log("[REAL]", d.toString());
  });

    processRef.stderr.on("data", (d: Buffer) => {
    console.error("[REAL ERROR]", d.toString());
  });

  processRef.on("close", () => {
    processRef = null;
  });
}

export function startTraining() {
  if (processRef) return;

  processRef = spawn("python", [
    "training_chart.py",
    "--source",
    "csv/source.csv",
    "--interval",
    "10",
    "--loop",
  ]);

  processRef.stdout.on("data", (d: Buffer) => {
    console.log("[TRAINING]", d.toString());
  });

    processRef.stderr.on("data", (d: Buffer) => {
    console.error("[TRAINING ERROR]", d.toString());
  });

  processRef.on("close", () => {
    processRef = null;
  });
}

export function stopProcess() {
  if (processRef) {
    processRef.kill();
    processRef = null;
  }
}