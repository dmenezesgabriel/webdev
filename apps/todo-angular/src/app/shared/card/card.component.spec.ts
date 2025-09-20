import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  template: `
    <app-card>
      <div card-content>This is the main content area of the card.</div>
      <div card-footer>This is the footer area of the card.</div>
    </app-card>
  `,
})
class TestHostComponent {}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const mockTitle = 'Just a card.';
  const mockSubTitle = 'A nice looking card!';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('CardComponent', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should render title correctly', () => {
      fixture.componentRef.setInput('title', mockTitle);

      fixture.detectChanges();

      const cardTitle = fixture.debugElement.query(By.css('.card-header h1'));

      expect(cardTitle.nativeElement.textContent.trim()).toBe(mockTitle);
    });

    it('should render subtitle correctly', () => {
      fixture.componentRef.setInput('title', mockTitle);
      fixture.componentRef.setInput('subtitle', mockSubTitle);

      fixture.detectChanges();

      const cardTitle = fixture.debugElement.query(By.css('.card-header p'));

      expect(cardTitle.nativeElement.textContent.trim()).toBe(mockSubTitle);
    });
  });

  it('should render card-content correctly', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);

    hostFixture.detectChanges();

    const cardContent = hostFixture.debugElement.query(
      By.css('[card-content]')
    );
    expect(cardContent.nativeElement.textContent.trim()).toBe(
      'This is the main content area of the card.'
    );
  });

  it('should render card-footer correctly', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);

    hostFixture.detectChanges();

    const cardContent = hostFixture.debugElement.query(By.css('[card-footer]'));
    expect(cardContent.nativeElement.textContent.trim()).toBe(
      'This is the footer area of the card.'
    );
  });
});
