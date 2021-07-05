import { Inject, Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import got from 'got';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,                      
  ) {
    console.log(options);
    this.sendEmail('testing', 'test').then(()=>{
      console.log("Message sent");
    }).catch((error)=>{
      console.log(error.response.body, "Catch Before..................!!!!!!......................");
    });
  }                                                                

  private async sendEmail(subject: string, content: string) {
    const form = new FormData();
    form.append('from', `Excited User <mailgun@${this.options.domain}>`);
    form.append('to', `hoos31320@gmail.com`);
    form.append('subject', subject);
    form.append('template', 'verify-email');
    form.append('v:code', 'asasas');
    form.append('v:username', 'nico!!!!');
    const response = await got(
      `https://api.mailgun.net/v3/${this.options.domain}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      },
    );
    console.log(response.body, "the last..........................!!!!!!.....................");
  }
  
}
