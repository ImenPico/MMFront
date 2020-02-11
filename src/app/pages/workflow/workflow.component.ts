import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FlowableService} from '../../flowable.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {

  @Input() taskid: any;
  @Input() processInstanceId: any;
  @Input() description: any;
  @Input() authentifier: any;
  @Input() comment:any;
  @Input()params:any
  @Output() messageEvent = new EventEmitter<any>();
  decisionTab: any[] = [];
  historicTasks: any[] = [];
  message: string = "Hello!"
  constructor(private flowable: FlowableService, private router: Router) {
  }

  ngOnInit() {
    if(this.taskid!=="null"){
        console.log("taskId in  comp workflow",this.taskid)
      this.getdecisions(this.taskid);
      this.getActivityHistoric(this.taskid);
    }else{
      this.getProcessInstanceHistoric(this.processInstanceId);
    }
  }

  getdecisions(taskId) {

    this.flowable.getGatewayDecision(taskId).subscribe(result => {
      console.log('result WS GET Decision', result);
      this.decisionTab = result;
      this.historicTasks = [];
    });
      return this.decisionTab;
  }

  getActivityHistoric(taskId){
    this.flowable.historicTask(taskId)
        .subscribe(
            (data: any[]) => {
              console.log('historictask======>', data);
              data.forEach(d => {
                const histTab = d.split(' * ');

                if (histTab[1] === null) {
                  histTab[1] = '---------';
                }

                const obj = {
                  taskName: histTab[0],
                  decision: histTab[1],
                  assignee: histTab[2],
                  startTime: histTab[3],
                  endTime: histTab[4],
                  duree: histTab[5],
                  description: histTab[6]
                };
                this.historicTasks.push(obj);
              });
            }
        );
    console.log(this.historicTasks);

  }

  getProcessInstanceHistoric(processInstanceId){
    this.flowable.historicProcessInstance(processInstanceId)
        .subscribe(
            (data: any[]) => {
              console.log('historictask======>', data);
              data.forEach(d => {
                const histTab = d.split(' * ');

                if (histTab[1] === null) {
                  histTab[1] = '---------';
                }

                const obj = {
                  taskName: histTab[0],
                  decision: histTab[1],
                  assignee: histTab[2],
                  startTime: histTab[3],
                  endTime: histTab[4],
                  duree: histTab[5],
                  description: histTab[6]
                };
                this.historicTasks.push(obj);
              });
            }
        );
    console.log(this.historicTasks);

  }

  routerdocument(processInstanceId,taskid,decision,comment,authentifier,params) {
      this.flowable.nextTask(processInstanceId,taskid, decision, comment, authentifier,params).subscribe(
         resultNextTask => {
          console.log("result",resultNextTask)
          this.messageEvent.emit(resultNextTask)
          console.log("result",this.messageEvent.emit)
          return resultNextTask
        });
  }

  StartProcessInstance(name, process) {

    console.log('Trying Start Process ', process, ' ...');
    console.log('Initiator : ', localStorage.getItem('profileUser'));

    this.flowable.startProcessInstance(name, process)
        .subscribe((result: {}) => {

          console.log('Generated TaskID : ', result);
          localStorage.setItem("taskId", result[0])
          localStorage.setItem("processInstanceId", result[1])
          localStorage.setItem("ActivityName", result[2])
            this.router.navigate(['/' + result[2]]);
          console.log('Process Started Successfuly');


        });

  }

  setCondidates(taskid, authors, readers) {

    this.flowable.setCondidates(taskid, authors, readers)
        .subscribe((result: {}) => {
          console.log('authors and readers saved with Success');
        });

  }


}
