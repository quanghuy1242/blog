import { Component, OnInit, Injectable } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';

/**
 * Route Name class with nested structure
 */
export class RouteNode {
  children: RouteNode[];
  name: string;
  url: string;
}

export class RouteFlatNode {
  constructor(
    public expandable: boolean,
    public name: string,
    public level: number,
    public url: string
  ) {}
}

/**
 * The route structure tree data
 */
const TREE_DATA = JSON.stringify({
  "Blogs": '/home',
  "About me": "/about",
  "Research": {
    "Face Detection": "/research/face-detection"
  }
});

@Injectable()
export class RouteDataBase {
  dataChange = new BehaviorSubject<RouteNode[]>([]);

  get data(): RouteNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    const dataObject = JSON.parse(TREE_DATA);
    const data = this.buildRouteTree(dataObject, 0);
    this.dataChange.next(data);
  }

  /** 
   * Build the structure tree. The value is a obj or a url
   * The return is a list of RouteNode
   */
  buildRouteTree(obj: { [key: string]: any }, level: number): RouteNode[] {
    return Object.keys(obj).reduce<RouteNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new RouteNode();
      node.name = key;

      if (value !== null) {
        if (typeof value === 'object') {
          node.children = this.buildRouteTree(value, level + 1);
        } else {
          node.url = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  providers: [RouteDataBase]
})
export class SideNavComponent implements OnInit {
  treeControl: FlatTreeControl<RouteFlatNode>;
  treeFlattener: MatTreeFlattener<RouteNode, RouteFlatNode>;
  dataSource: MatTreeFlatDataSource<RouteNode, RouteFlatNode>;

  transformer = (node: RouteNode, level: number) => {
    return new RouteFlatNode(!!node.children, node.name, level, node.url);
  }

  constructor(
    private database: RouteDataBase
  ) { }

  ngOnInit() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<RouteFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.database.dataChange.subscribe(data => this.dataSource.data = data);
  }
  
  private _getLevel = (node: RouteFlatNode) => node.level;
  private _isExpandable = (node: RouteFlatNode) => node.expandable;
  private _getChildren = (node: RouteNode): Observable<RouteNode[]> => observableOf(node.children);
  hasChild = (_: number, _nodeData: RouteFlatNode) => _nodeData.expandable;

}
