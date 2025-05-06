import { Icon } from 'idea-react';
import { observer } from 'mobx-react';
import { FC, HTMLAttributes } from 'react';
import { Form } from 'react-bootstrap';

import systemStore from '../models/System';
import styles from './LightSwitch.module.less';

const LightSwitch: FC<HTMLAttributes<HTMLDivElement>> = observer(
  ({ className = '', ...props }) => (
    <div
      className={`d-flex align-items-center text-white ${className}`}
      {...props}
    >
      <Icon name="moon" />

      <div className="ps-2 pe-1">
        <Form.Switch
          className={styles.switch}
          checked={systemStore.colorScheme === 'light'}
          onClick={systemStore.toggleColorScheme}
        />
      </div>
      <Icon name="sun" />
    </div>
  ),
);
export default LightSwitch;
