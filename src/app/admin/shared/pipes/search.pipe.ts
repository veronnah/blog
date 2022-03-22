import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "../../../shared/interfaces";

@Pipe({
  name: 'searchPosts'
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], search = ''): Post[] {
    if (!search.trim()) {
      return posts;
    }

    return posts.filter(post => {
      const formattedTitle = post.title.toLowerCase().includes(search.toLowerCase());
      const formattedAuthor = post.author.toLowerCase().includes(search.toLowerCase());

      return formattedTitle || formattedAuthor;
    });
  }
}
