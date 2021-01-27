import { HttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { GameComponent } from "./game.component";

describe("GameComponent", () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  const httpMock = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  };

  const routerMock = {
    navigate: jest.fn()
  };

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: jest.fn()
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameComponent],
      providers: [
        { provide: HttpClient, useValue: httpMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
