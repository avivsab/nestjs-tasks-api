import { format, transports } from 'winston';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const logDirectory = join(__dirname, 'logs');

if (!existsSync(logDirectory)) {
  mkdirSync(logDirectory);
}

const getDateHourFormat = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours().toString().padStart(2, '0');
  return `${year}-${month}-${day}_${hour}`;
};

const winstonConfig = {
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.simple(),
      ),
    }),
    new transports.File({
      filename: join(logDirectory, `${getDateHourFormat()}_logs.log`),
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
    }),
  ],
};

export default winstonConfig;
