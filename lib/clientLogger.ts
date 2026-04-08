const prefix = (tag: string) => `[${tag}]`;

export const logger = {
  system: (msg: string) => console.log(prefix("SYSTEM"), msg),
  mw:     (msg: string) => console.log(prefix("MW"),     msg),
  jetsinter:(msg: string) => console.log(prefix("JETSINTER"),msg),
  error:  (msg: string) => console.error(prefix("ERROR"), msg),
};
