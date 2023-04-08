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
    category: ['კარდიოლოგი / არითმოლოგი'],
    views: 333,
  };

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
        observer.next(id)
      });
    });
  }

  onBooking(day: Day) {
    if (this.doctor.id) {
      const book: Book = {
        date: day.date,
        doctorId: this.doctor.id,
        userId: this.authService.loggedUser.id,
      };
      this.bookService.addBook(book).subscribe((data) => {
        console.log(data);
        if (data.res) {
          day.bookId = data.res.id;
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
}
