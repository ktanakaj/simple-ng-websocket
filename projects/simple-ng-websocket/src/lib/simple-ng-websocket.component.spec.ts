import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleNgWebsocketComponent } from './simple-ng-websocket.component';

describe('SimpleNgWebsocketComponent', () => {
  let component: SimpleNgWebsocketComponent;
  let fixture: ComponentFixture<SimpleNgWebsocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleNgWebsocketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleNgWebsocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
