import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { DownUnderService } from "./downunder.service";

describe("DownUnderService", () => {
  let service: DownUnderService;
  const httpMock = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpMock }]
    });
    service = TestBed.inject(DownUnderService);
    jest.clearAllMocks();
  });

  test("should be created", () => {
    expect(service).toBeTruthy();
  });

  test("should create a session", () => {
    service.createSession({
      SETTING_NAME: "Session",
      SETTING_CHIPS: 3,
      SETTING_MAX_PLAYERS: 8
    });
    expect(httpMock.post).toHaveBeenCalledTimes(1);
  });

  test("should get a session", () => {
    service.getSession("ASDFG", "ASDFG");
    expect(httpMock.get).toHaveBeenCalledTimes(1);
  });

  test("should delete a session", () => {
    service.deleteSession("ASDFG");
    expect(httpMock.delete).toHaveBeenCalledTimes(1);
  });

  test("should create a player", () => {
    service.createPlayer("ASDFG", { username: "Alfagun74" });
    expect(httpMock.post).toHaveBeenCalledTimes(1);
  });

  test("should delete a player", () => {
    service.deletePlayer("ASDFG", "ASDFG");
    expect(httpMock.delete).toHaveBeenCalledTimes(1);
  });

  test("should play a card", () => {
    service.playCard("ASDFG", "ASDFG", "ASFG");
    expect(httpMock.post).toHaveBeenCalledTimes(1);
  });

  test("should end a players turn", () => {
    service.endTurn("ASDFG", "ASDFG");
    expect(httpMock.post).toHaveBeenCalledTimes(1);
  });

  test("should reset a session", () => {
    service.resetSession("ASFFG");
    expect(httpMock.delete).toHaveBeenCalledTimes(1);
  });
});
