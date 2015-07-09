var _Table = function(width) {

    var Table = FixedDataTable.Table,
        Column = FixedDataTable.Column;


    var React_Fixed_Data_Table = React.createClass({
        getInitialState:function(){
            return ({
                rows:[
                    {p:'a', e:'x', f:'a'},
                    {p:'b', e:'v', f:'d'},
                    {p:'c', e:'h', f:'s'},
                    {p:'c', e:'h', f:'s'},
                    {p:'a', e:'h', f:'s'},
                    {p:'h', e:'h', f:'s'},
                    {p:'c', e:'h', f:'s'},
                    {p:'b', e:'d', f:'a'}
                ]

            })
        },


        render:function(){
            var data = this.state.rows;

            var tableWidth = width-2,
                headerHeight = 40,
                rowHeight = 70,
                tableHeight = (data.length)*rowHeight + headerHeight+2,
                columnWidth =  tableWidth / 3;

            var sortHeaderRenderer = function(value, index) {

                    return (<div id={index} className={'header-cell-'+index} onClick={this._sortColumn}>{value}</div>);
                }.bind(this);

            return(
                <Table
                    rowHeight={rowHeight}
                    rowGetter={this._rowGetter}
                    rowsCount={data.length}
                    width={tableWidth}
                    height={tableHeight}
                    headerHeight={headerHeight}>

                    <Column
                        label="First Column"
                        width={columnWidth}
                        dataKey={0}
                        cellRenderer={ this._cellRenderer }
                        headerRenderer={sortHeaderRenderer}
                        />

                    <Column
                        label="Second Column"
                        width={columnWidth}
                        dataKey={1}
                        cellRenderer={ this._cellRenderer }
                        headerRenderer={sortHeaderRenderer}
                        />

                    <Column
                        label="Third Column"
                        width={columnWidth}
                        dataKey={2}
                        cellRenderer={ this._cellRenderer }
                        headerRenderer={sortHeaderRenderer}
                        />

                </Table>
            );
        },

        _rowGetter:function(rowIndex){
            return this.state.rows[rowIndex];
        },

        _cellRenderer:function(value, index, obj, b, n){
            var value = '';
            if(!index){
                value = obj.p;
            }
            else if(index === 1){
                value = obj.e;
            }
            else if(index === 2){
                value = obj.f;
            }

            return <div className={'custom-cell-'+index}>{value}</div>
        },

        _sorted:false,
        _sortColumn: function(r) {
             
            var index = parseInt(r.target.id),
                field = 'f';

            //TO DO set a field for sorting based on a column index
            //currently set to field 'f' -> line 100

            var self = this;

            function asc(a, b){
                self._sorted = 'asc';
                var a = a[field].toLowerCase(),
                    b = b[field].toLowerCase();

                if(a > b){ return 1; }
                else{ return -1; }    
            }

            function desc(a, b){
                self._sorted = 'desc';
                var a = a[field].toLowerCase(),
                    b = b[field].toLowerCase();

                if(a < b){ return 1; }
                else{ return -1; }
            }

            var callback = function(){};
            if(!self._sorted || self._sorted === 'desc' ){
                callback = asc;
            }
            else if(self._sorted === 'asc'){
                callback = desc;   
            }
            this.setState({rows: this.state.rows.sort(callback)});
          
        }
    });

    React_Fixed_Data_Table = React.createFactory(React_Fixed_Data_Table);

    React.render(
        React_Fixed_Data_Table(),
        document.getElementById('table')
    );
    

}
