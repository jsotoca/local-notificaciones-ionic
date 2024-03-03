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

  notificar(newItem: any) {
    let options: ScheduleOptions = {
      notifications: [
        {
          id: 1,
          title: 'Nuevo ítem agregado',
          body: newItem.body || 'naruto',
          largeBody: newItem.body || 'Se ha agregado un nuevo ítem a la colección.',
          summaryText: 'Nuevo ítem', // Texto de resumen (puede variar según las notificaciones del sistema)
        }
      ]
    };
    try {
      LocalNotifications.schedule(options);
    } catch (error) {
      console.log(error);
    }
  }

  mostrarAlerta() {
    let options: ScheduleOptions = {
      notifications: [
        {
          id: 1,
          title: 'hola',
          body: 'hola',
          largeBody: 'hola',
          summaryText: 'hola',
        }
      ]
    }
    try {
      LocalNotifications.schedule(options)
    } catch (error) {
      console.log(error)
    }
  }

}
