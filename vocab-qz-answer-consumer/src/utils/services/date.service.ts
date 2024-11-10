import * as moment from 'moment-timezone';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DateService {
  private timezone: string;

  constructor(private configService: ConfigService) {
    // Load the timezone from the environment variable, default to 'UTC'
    this.timezone = this.configService.get<string>('APP_TIMEZONE') || 'UTC';
  }
  getCurrentDate(): Date {
    const formattedDate = moment
      .utc(new Date())
      .tz(this.timezone)
      //.utc(true)
      .toDate();
    return formattedDate;
  }

  // Converts any Date object to UTC before saving to the database
  toUTC(date: Date): Date {
    return moment.utc(date).toDate();
  }

  // Converts a UTC date to your preferred timezone (UTC+7 in config)
  fromUTCToTimezone(date: Date): Date {
    return moment.utc(date).tz(this.timezone).utc(true).toDate();
  }

  // Converts a Date to ISO 8601 format in UTC
  toISOStringInUTC(date: Date): string {
    return moment.utc(date).toISOString();
  }
}
