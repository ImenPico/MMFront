import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class MessagesService {

    returndata:any;
    private url: string;
    public currentToken: string = "";
    private notifications=[];

    constructor(private httpClient: HttpClient) {
        this.url = 'http://localhost:4200/';
    }
    loadToken(): string {
        this.currentToken = localStorage.getItem("userToken");
        return this.currentToken;
    }

    getAutorization(){
        return new HttpHeaders().append("Authorization", this.loadToken());
    }

    // getNotificationBySendTo(username){
    //     this.httpClient.get('api/notificationsBySendTo',
    //         {params:new HttpParams().set("username", localStorage.getItem('profileUser'))})
    //         .subscribe( (data:Array<Object>) => {
    //             console.log("hello   world");
    //
    //             this.notifications=data;
    //
    //         })
    // }

    // [
    //     {
    //         "idNotification": 2,
    //         "subject": "subject1",
    //         "date": "2019-10-17T01:00:00.000+0000",
    //         "sendto": "Mariem CHOUARI",
    //         "blindcc": "",
    //         "cc": "",
    //         "user": "mariem.chouari",
    //         "status": 0,
    //         "idProcedure": 1
    //     },
    //     {
    //         "idNotification": 4,
    //         "subject": "subject1",
    //         "date": "2019-10-17T01:00:00.000+0000",
    //         "sendto": "Dr. Foued BEN AMEUR",
    //         "blindcc": "Mariem CHOUARI",
    //         "cc": "",
    //         "user": "mariem.chouari",
    //         "status": 0,
    //         "idProcedure": 2
    //     }
    // ];

    private messages = [
        {
            name: 'ashley',
            text: 'After you get up and running, you can place Font Awesome icons just about...',
            time: '1 min ago'
        },
        {
            name: 'michael',
            text: 'You asked, Font Awesome delivers with 40 shiny new icons in version 4.2.',
            time: '2 hrs ago'
        },
        {
            name: 'julia',
            text: 'Want to request new icons? Here\'s how. Need vectors or want to use on the...',
            time: '10 hrs ago'
        },
        {
            name: 'bruno',
            text: 'Explore your passions and discover new ones by getting involved. Stretch your...',
            time: '1 day ago'
        },
        {
            name: 'tereza',
            text: 'Get to know who we are - from the inside out. From our history and culture, to the...',
            time: '1 day ago'
        },
        {
            name: 'adam',
            text: 'Need some support to reach your goals? Apply for scholarships across a variety of...',
            time: '2 days ago'
        },
        {
            name: 'michael',
            text: 'Wrap the dropdown\'s trigger and the dropdown menu within .dropdown, or...',
            time: '1 week ago'
        }
    ];

    private files = [
        {
            text:'startng.zip',
            size: '~7.2 MB',
            value: '47%',
            class: 'danger'
        },
        {
            text: 'documentation.pdf',
            size: '~14.6 MB',
            value: '33%',
            class: 'info'
        },
        {
            text: 'wallpaper.jpg',
            size: '~558 KB',
            value: '60%',
            class: 'success'
        },
        {
            text: 'letter.doc',
            size: '~57 KB',
            value: '80%',
            class: 'warning'
        },
        {
            text: 'azimuth.zip',
            size: '~10.2 MB',
            value: '55%',
            class: 'primary'
        },
        {
            text: 'contacts.xlsx',
            size: '~96 KB',
            value: '75%',
            class: 'info'
        }
    ];

    private meetings = [
        {
            day: '09',
            month: 'May',
            title: 'Meeting with Bruno',
            text: 'Fusce ut condimentum velit, quis egestas eros. Quisque sed condimentum neque.',
            color: 'danger'
        },
        {
            day: '15',
            month: 'May',
            title: 'Training course',
            text: 'Fusce arcu tortor, tempor aliquam augue vel, consectetur vehicula lectus.',
            color: 'primary'
        },
        {
            day: '12',
            month: 'June',
            title: 'Dinner with Ashley',
            text: 'Curabitur rhoncus facilisis augue sed fringilla.',
            color: 'info'
        },
        {
            day: '14',
            month: 'June',
            title: 'Sport time',
            text: 'Vivamus tristique enim eros, ac ultricies sem ultrices vitae.',
            color: 'warning'
        },
        {
            day: '29',
            month: 'July',
            title: 'Birthday of Julia',
            text: 'Nam porttitor justo nec elit efficitur vestibulum.',
            color:'success'
        }
    ];

    public getMessages():Array<Object> {
        return this.messages;
    }

    public getFiles():Array<Object> {
        return this.files;
    }

    public getMeetings():Array<Object> {
        return this.meetings;
    }

    // getNotification():Array<Object> {
    //     this.getNotificationBySendTo("mariem.chouari");
    //     return this.notifications;
    // }

}
