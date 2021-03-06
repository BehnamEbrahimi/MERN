import ExtendedJoi from '../../utils/Joi/ExtendedJoi';

export default [
  {
    label: 'Campaign Title',
    name: 'title',
    schema: ExtendedJoi.string()
      .required()
      .label('Campaign Title')
  },
  {
    label: 'Subject Line',
    name: 'subject',
    schema: ExtendedJoi.string()
      .required()
      .label('Subject Line')
  },
  {
    label: 'Email Body',
    name: 'body',
    schema: ExtendedJoi.string()
      .required()
      .label('Email Body')
  },
  {
    label: 'Recipient List',
    name: 'recipients',
    schema: ExtendedJoi.listOfEmails().label('Recipient List')
  }
];
