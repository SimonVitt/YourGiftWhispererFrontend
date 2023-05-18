import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGiftIdeaComponent } from './single-gift-idea.component';

describe('SingleGiftIdeaComponent', () => {
  let component: SingleGiftIdeaComponent;
  let fixture: ComponentFixture<SingleGiftIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleGiftIdeaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleGiftIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
