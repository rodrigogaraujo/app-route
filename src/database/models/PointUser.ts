import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

class PointUser extends Model {
  static table = 'routeuserpoints'

  @field('lat')
  lat!: string;

  @field('lng')
  lng!: string;

  @field('date')
  date!: number;

}

export { PointUser }