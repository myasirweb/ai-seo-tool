export interface MetaVariant {
  title: string;
  description: string;
}

export interface MetaResult {
  _id?: string;
  topic: string;
  targetKeyword: string;
  variants: MetaVariant[];
  createdAt?: Date;
}

export interface MetaRequest {
  topic: string;
  targetKeyword: string;
  tone?: string;
}

export type MetaResponse = { variants: MetaVariant[] } | { error: string };
