import { Component } from '@angular/core';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items: Observable<any[]> = of([]);

  constructor(db: AngularFirestore) {
    this.items = db.collection('items', ref => ref.orderBy('timestamp')).valueChanges().pipe(
      tap((items: any[]) => {
        if (items.length > 0) {
          const newItem = items[items.length - 1];
          this.notificar(newItem);
        }
      })
    );
  }

  notificar(item: any) {
    let options: ScheduleOptions = {
      notifications: [
        {
          id: 1,
          title: item.title,
          body: item.body,
          largeBody: item.largeBody,
          summaryText: item.summaryText
        }
      ]
    };
    try {
      LocalNotifications.schedule(options);
    } catch (error) {
      console.log(error);
    }
  }

}
