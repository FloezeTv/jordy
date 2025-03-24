import typia from "typia";

export type AbstractPacket = {
  type: string;
};

export const isAbstractPacket = typia.createIs<AbstractPacket>();
