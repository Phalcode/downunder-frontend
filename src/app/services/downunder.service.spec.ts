import { TestBed } from "@angular/core/testing";
import { Socket } from "ngx-socket-io";
import { DownUnderService } from "./downunder.service";

describe("DownUnderService", () => {
  let service: DownUnderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Socket }]
    });
    service = TestBed.inject(DownUnderService);
    jest.clearAllMocks();
  });
  test("should be created", () => {
    expect(service).toBeTruthy();
  });
});
