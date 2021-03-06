import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { TestSuitesService } from './../../../services';
import { TestSuite } from './../../../../entity';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { TestSuitesModal } from "../modal/test-suites-modal";

@Component({
    selector: 'test-suites-table',
    templateUrl: './test-suites-table.html'
})
export class TestSuitesTable implements OnInit {

    testSuites: TestSuite[];
    columnsToDisplay = ['name', 'app_id', 'app_code', 'test_suite', 'line_of_service', 'actions'];
    dataSource: MatTableDataSource<TestSuite>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Input() set update(value: boolean) {
        this.reset();
    }

    constructor(private testSuitesService: TestSuitesService, private dialog: MatDialog) {}

    ngOnInit() {
        this.reset();
    }

    reset() {
        this.testSuitesService.getAll().then(testSuites => {
            this.testSuites = testSuites;
            this.dataSource = new MatTableDataSource(testSuites);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }).catch(err => {
            console.log(err);
        });
    }

    run(id: number) {
        console.log(id);
    }

    edit(id: number) {
        let dialogRef = this.dialog.open(TestSuitesModal, {
            data: {id: id}
        });
        dialogRef.afterClosed().subscribe(() => {
            this.reset();
        });
    }

    delete(id: number) {
        this.testSuitesService.delete({id: id}).then(result => {
            if (result)
                this.reset();
        }).catch(err => {
            console.log(err);
        });
    }
}