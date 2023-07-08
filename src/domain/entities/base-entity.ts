export abstract class BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;

  public removeNullUndefined() {
    return Object.fromEntries(
      Object.entries(this).filter(([, v]) => v != null),
    );
  }
}
