import {interval} from 'rxjs';
import {map} from 'rxjs/operators';

const source = interval(1000).pipe(
    map(x => x * x)
);

source.subscribe(x => console.log(x));