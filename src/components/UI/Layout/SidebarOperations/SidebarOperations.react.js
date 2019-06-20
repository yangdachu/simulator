import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ReactComponent as IconAddPipeline } from 'images/add-pipeline.svg';
import { ReactComponent as IconAddAlgorithm } from 'images/add-algorithm.svg';
import { ReactComponent as IconAddDebug } from 'images/add-debug.svg';

import { Layout, Icon, Menu } from 'antd';

import { HCOLOR } from 'constants/colors';

const SiderLight = styled(Layout.Sider)`
  border-left: 1px solid ${HCOLOR.border};
`;

const StyledItem = styled(Menu.Item)`
  margin-left: -16px;
  margin-top: 20px;
`;

const addMenuItems = items =>
  items.map(([name, component]) => (
    <StyledItem key={name}>
      <Icon
        type={component}
        component={component}
        style={{ fill: 'green', fontSize: '25px' }}
      />
      <span>{name}</span>
    </StyledItem>
  ));

export default function SidebarOperations({ onSelect }) {
  return (
    <SiderLight theme="light" collapsed={true} collapsedWidth={60}>
      <Menu
        mode="vertical"
        onSelect={i => onSelect(i.key)}
        selectedKeys={[]}
        style={{ marginTop: '20%' }}
      >
        {addMenuItems([
          ['Add Pipeline', IconAddPipeline],
          ['Add Algorithm', IconAddAlgorithm],
          ['Add Debug', IconAddDebug]
        ])}
      </Menu>
    </SiderLight>
  );
}

SidebarOperations.propTypes = {
  onSelect: PropTypes.func.isRequired
};