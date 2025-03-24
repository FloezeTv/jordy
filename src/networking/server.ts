import type { GameSave, GameState } from "~/game-state";
import { EMPTY_SAVE, stateFromSave } from "~/game-state";
import type { DataConnection } from "peerjs";
import { Peer } from "peerjs";
import { isAbstractPacket } from "./packet";

/**
 * A server for the game
 */
export class Server {
  private readonly state: GameState;

  private readonly adminPeer: Peer;
  private readonly admins: DataConnection[] = [];
  private readonly playerPeer: Peer;
  private readonly players: DataConnection[] = [];

  /**
   * Creates a new game server
   *
   * @param save game save to load
   */
  constructor(save: GameSave = EMPTY_SAVE) {
    this.state = stateFromSave(save);
    this.adminPeer = new Peer();
    this.playerPeer = new Peer();

    this.adminPeer.on(
      "connection",
      Server.addConnection(this.admins, (data) => {
        if (!isAbstractPacket(data)) {
          console.warn("Received invalid data from peer");
          return;
        }

        console.log("Received admin packet:", data);
      }),
    );
    this.playerPeer.on(
      "connection",
      Server.addConnection(this.players, (data) => {
        if (!isAbstractPacket(data)) {
          console.warn("Received invalid data from peer");
          return;
        }

        console.log("Received player packet:", data);
      }),
    );
  }

  /**
   * Returns a connection-handler that will add/remove the connection to/from `target` on connect/disconnect,
   * and registers the passed `dataHandler`.
   *
   * @param target array to maintain connections in
   * @param dataHandler handler to call on new data
   * @returns a handler that can be installed on a {@link Peer}s `connection`-event
   */
  private static addConnection(
    target: DataConnection[],
    dataHandler: (data: unknown) => void,
  ): (connection: DataConnection) => void {
    return (connection) => {
      target.push(connection);
      connection.on("close", () => {
        const idx = target.indexOf(connection);
        if (idx < 0) return;
        target.splice(idx, 1);
      });
      connection.on("data", dataHandler);
    };
  }

  /**
   * Returns a promise that resolves with the passed `peer`s id as soon as it is ready.
   * @param peer {@link Peer} to get the id for
   * @returns a promise that will resolve to the `peer`s id
   */
  private static getId(peer: Peer): Promise<string> {
    const promise = new Promise<string>((resolve) =>
      peer.once("open", resolve),
    );
    if (!peer.open) return promise;
    return Promise.resolve(peer.id);
  }

  /**
   * Get the admin connection id which can be used to join the game as an admin
   */
  adminId(): Promise<string> {
    return Server.getId(this.adminPeer);
  }

  /**
   * Get the player connection id which can be used to join the game as a player
   */
  playerId(): Promise<string> {
    return Server.getId(this.playerPeer);
  }
}
