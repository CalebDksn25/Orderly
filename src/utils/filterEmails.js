export const filterEmails = (emails, criteria) => {
  return emails.filter(email => {
    const { payload } = email;
    const headers = payload.headers || [];
    const subjectHeader = headers.find(header => header.name === 'Subject');
    const subject = subjectHeader ? subjectHeader.value : '';

    return criteria.some(keyword => subject.includes(keyword));
  });
};
