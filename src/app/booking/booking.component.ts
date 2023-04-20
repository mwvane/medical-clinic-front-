import { Component, OnInit } from '@angular/core';
import { Doctor } from '../user/models/doctor';
import { Day } from '../calendar-component/models/day';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Route } from '@angular/router';
import { DoctorService } from '../user/services/doctor.service';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CalendarMode } from '../calendar-component/calendarMode';
import { ModalService } from '../modals/modal.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [MessageService],
})
export class BookingComponent implements OnInit {
  doctor: Doctor = {
    id: 6,
    firstname: 'ანა',
    lastname: 'დვალი',
    role: 'doctor',
    bookCount: 501,
    email: 'doctor@gmail.com',
    image: '',
    rating: 5,
    isPinned: false,
    category: { name: '' },
    views: 333,
  };

  calendarMode = CalendarMode.default;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private docotorService: DoctorService,
    private bookService: BookService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.docotorService.getDoctors(id).subscribe((data) => {
          if (data.res) {
            this.doctor = data.res;
          }
        });
      }
    });
  }

  get doctorId() {
    return new Observable<number>((observer) => {
      this.route.params.subscribe((params) => {
        const id = params['id'];
        observer.next(id);
      });
    });
  }

  onBooking(payload: any) {
    if (this.doctor.id) {
      const book: Book = {
        date: payload.day.date,
        description: payload.description,
        doctorId: this.doctor.id,
        userId: this.authService.loggedUser.id,
      };
      this.bookService.addBook(book).subscribe((data) => {
        if (data.res) {
          payload.day.isCurrentUserBook = true;
          payload.day.book = data.res;
          this.messageService.add({
            severity: 'success',
            summary: 'Booking',
            detail: `თქვენ წარმატებით დაჯავშნეთ ვიზიტი ${this.doctor.firstname} ${this.doctor.lastname}-სთან`,
            life: 3000,
          });
        }
      });
    }
  }

  onBookUpdate(day: Day) {
    this.bookService.updateBook(day.book!).subscribe((data) => {
      alert(data.res);
    });
  }
}
