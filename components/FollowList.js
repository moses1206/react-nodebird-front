import React from 'react';
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import styles from '../styles/FollowList.module.css';

const FollowList = ({ header, data }) => (
  <List
    className={styles.list}
    grid={{ gutter: 4, xs: 2, md: 3 }}
    size="small"
    header={<div>{header}</div>}
    loadMore={
      // eslint-disable-next-line react/jsx-wrap-multilines
      <div className={styles.loadmore}>
        <Button>더보기</Button>
      </div>
    }
    bordered
    dataSource={data}
    renderItem={(item) => (
      <List.Item className={styles.list_item}>
        <Card actions={[<StopOutlined key="stop" />]}>
          <Card.Meta description={item.nickname} />
        </Card>
      </List.Item>
    )}
  />
);

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
