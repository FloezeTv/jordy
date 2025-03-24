export type AbstractPacket = {
  type: string;
};

export const isAbstractPacket = (value: unknown): value is AbstractPacket =>
  value !== null &&
  typeof value === "object" &&
  typeof (value as any).type === "string";
