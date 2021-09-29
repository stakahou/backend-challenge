export enum KafkaProducerEnum {
  KAFKA_SUBMISSION_PRODUCER = 'KAFKA_SUBMISSION_PRODUCER',
  KAFKA_DESAFIOS_PRODUCER = 'KAFKA_DESAFIOS_PRODUCER',
}

export enum KafkaTopicEnum {
  CHALLENGE_CORRECTION = 'challenge.correction',
}

export enum SubmissionStatusEnum {
  PENDING = 'Pending',
  ERROR = 'Error',
  DONE = 'Done',
}
