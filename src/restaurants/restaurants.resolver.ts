import { Resolver, Query, Args } from "@nestjs/graphql";
import { Restaurant } from "./entities/restaurant.entity";

@Resolver()

export class RestaurantResolver {

  @Query(returns => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    console.log(veganOnly);
    return [];
  }
}