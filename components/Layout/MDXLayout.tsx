import { Container, ContainerProps } from 'idea-react';
import { FC } from 'react';

import { PageHead } from './PageHead';

export const MDXLayout: FC<ContainerProps> = ({
  title,
  children,
  ...props
}) => (
  <Container as="article" {...props}>
    <PageHead title={title} />
    <h1 className="my-4">{title}</h1>

    {children}
  </Container>
);
