const { MAIL_USER, MAIL_PASS, MAIL_HOST, MAIL_PORT } = process.env;
const MAIL_SECURE = process.env.MAIL_SECURE === 'true';

export default {
  host: MAIL_HOST || '',
  port: MAIL_PORT ? Number(MAIL_PORT) : 465,
  secure: MAIL_SECURE || true,
  auth: {
    user: MAIL_USER || '',
    pass: MAIL_PASS || '',
  },
};
