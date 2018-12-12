// libs


import { connect } from 'react-redux';
import { Table, Tag, Progress } from 'antd';
import { createSelector } from 'reselect';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withState } from 'recompose';
import { openModal } from '../actions/modal.action';
import { init } from '../actions/containerTable.action';
import TabSwitcher from './TabSwitcher';
import { getData } from '../actions/jaegerGetData.action';

const RECORD_STATUS = {
  active: '#2db7f5',
  completed: '#87d068',
  failed: '#f50',
  stopped: '#ec8c16'
};

class ContainerTable extends Component {
  componentWillMount() {
    this.props.init();

    const sorter = (a, b) => {
      let tempA = null;
      let tempB = null;
      tempA = a || '';
      tempB = b || '';
      return tempA.localeCompare(tempB);
    };
    this.columns = [
      {
        title: 'Job ID',
        dataIndex: 'key',
        key: 'key',
        width: '20%',
        sorter: (a, b) => sorter(a.key, b.key)
      },
      {
        title: 'Pipeline Name',
        dataIndex: 'status.pipeline',
        key: 'pipeline',
        width: '10%',
        onFilter: (value, record) => record.key.includes(value),
        sorter: (a, b) => sorter(a.key, b.key)
      },
      {
        title: 'Status',
        dataIndex: 'status.status',
        width: '5%',
        key: 'status',
        render: (text, record) => (<span>
          <Tag color={RECORD_STATUS[record.status && record.status.status]}>{record.status && record.status.status}</Tag>
        </span>
        ),
        sorter: (a, b) => sorter(a.status.status, b.status.status)
      },
      {
        title: 'time',
        dataIndex: 'status.timestamp',
        key: 'timestamp',
        width: '15%',
        sorter: (a, b) => sorter(a.timestamp, b.timestamp)
      },
      {
        title: 'Description',
        dataIndex: 'status.data.details',
        key: 'details',
        width: '25%'
      },
      {
        title: 'Progress',
        dataIndex: 'Progress',
        width: '30%',
        key: 'y',
        render: (text, record) => {
          let progress = (record.status && record.status.data && record.status.data.progress) || 0;
          const stopped = (record.state && record.status.status === 'stopped');
          progress = parseInt(progress);
          if (progress === 100) {
            return (<span>
              <Progress percent={progress}/>
            </span>);
          }
          return (<span>
            <Progress percent={progress} status={stopped ? 'exception' : 'active'}/>
          </span>);
        },
        sorter: (a, b) => sorter(a.status.data.progress, b.status.data.progress)
      }

    ];
  }

  renderColumns() {

  }

  render() {
    const { dataSource } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={dataSource.asMutable()}
          pagination={{
            defaultCurrent: 1, pageSize: 15
          }}
          locale={{ emptyText: 'no data' }}
          expandedRowRender={(record) => (
            <TabSwitcher record={{
              key: record.key,
              graph: record.graph,
              record: {
                pipeline: record.pipeline,
                status: record.status,
                results: record.results
              },
              jaeger: (this.props.jaeger[record.key] || null)
            }}/>
          )}
          onExpand={(expanded, record) => {
            if (expanded) {
              this.props.getData(record.key);
            }
          }}/>
      </div>
    );
  }

}


const containerTable = (state) => state.containerTable.dataSource;
const autoCompleteFilter = (state) => state.autoCompleteFilter.filter;

const tableDataSelector = createSelector(
  containerTable,
  autoCompleteFilter,
  (containerTable) => containerTable
);

ContainerTable.propTypes = {
  dataSource: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  dataSource: tableDataSelector(state),
  jaeger: state.jaeger,
  scriptsPath: state.serverSelection.currentSelection.scriptsPath,
  sshUser: state.serverSelection.currentSelection.user
});

export default connect(mapStateToProps, { openModal, init, getData })(
  withState('isVisible', 'onPopoverClickVisible', { visible: false, podName: '' })(ContainerTable)
);