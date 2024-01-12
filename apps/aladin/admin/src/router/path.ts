interface C {
  [key: string]: C;
}

export const PATH = {
  "/image": {
    ":imageId": {},
  },
  "/login": {},
  "/register": {
    verify: {},
  },
  "/recovery": {
    reset: {},
    otp: {},
  },
  "/payment": {},
  "/admin": {
    institution: {
      create: {},
      ":institutionId": {},
      update: {
        ":institutionId": {},
      },
    },
    student: {
      ban: {
        ":userId": {},
      },
      delete: {
        ":userId": {},
      },
    },
    lecture: {
      registration: {
        ":taId": {},
      },
    },
    discount: {
      create: {},
    },
    mod: {
      create: {},
    },
    subject: {
      create: {},
      ":subjectId": {
        update: {},
      },
    },
    major: {
      create: {},
      ":majorId": {
        update: {},
      },
    },

    role: {},

    voucher: {
      create: {},
      update: {
        ":voucherId": {},
      },
    },
  },
  "/student": {
    ta: {
      register: {},
      revise: {},
    },
  },
};

type PathKeys<T> = T extends C
  ? {
      [K in keyof T]: K | `${K & string}/${PathKeys<T[K]>}`;
    }[keyof T]
  : never;

export type Path = "/" | "*" | PathKeys<typeof PATH>;
