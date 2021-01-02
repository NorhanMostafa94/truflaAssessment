import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Controls } from './shared/enums/controls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'truflaAssessment';

  constructor(private fb: FormBuilder) { }

  controlsEnum: Controls;
  textAreaForm: FormGroup;
  formBuilder: FormGroup;

  fields = [];

  jsonArray: Controls[] = [
    {
      id: 'input1',
      label: 'input',
      name: 'input1',
      formControl: 'input',
      type: 'text'
    },
    {
      id: 'input2',
      label: 'input',
      name: 'input2',
      formControl: 'input',
      type: 'text'
    },
    {
      id: 'dropdown1',
      label: 'dropdown1',
      name: 'dropdown1',
      formControl: 'dropdown',
      type: 'select',
      list:[
        {
          id:'1',
          name:'option1'
        },
        {
          id:'2',
          name:'option2'
        }
      ]
    },
    {
      id: 'input3',
      label: 'cancel',
      name: 'btnCancel',
      formControl: 'cancel',
      type: 'button'
    },
    {
      id: 'input3',
      label: 'submit',
      name: 'btnSubmit',
      formControl: 'submit',
      type: 'submit'
    }
  ]

  errorMessage: string;

  ngOnInit() {
    this.initTextAreaForm();
    this.textAreaForm.valueChanges.subscribe(res => {
      this.initFormBuilder(this.TextArea.value);
    });
  }

  change() {
    this.initFormBuilder(this.TextArea.value);

  }

  initTextAreaForm() {
    this.textAreaForm = this.fb.group({
      'textArea': new FormControl(JSON.stringify(this.jsonArray, null,'  '))
    });
    this.initFormBuilder(this.TextArea.value);
  }

  get TextArea() {
    return this.textAreaForm.get('textArea');
  }

  initFormBuilder(controls) {
    let field = {};
    this.fields = [];
    // this.formBuilder = this.fb.group({});
    try {
      let jsonArray = JSON.parse(controls)
      for (const control of jsonArray) {
        if (typeof (control) === 'object') {

          field[control.name] = this.fb.control('');
          this.formBuilder = this.fb.group(field);
          this.fields.push(control)
        }
      }
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = `Please follow this model for form control`;
    }

  }

  submit(){
    console.log(this.formBuilder.value);
  }

  cancel(){
    this.formBuilder.reset();
  }

}
