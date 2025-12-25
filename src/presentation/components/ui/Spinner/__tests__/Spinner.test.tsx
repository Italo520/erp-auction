import { render, screen } from '@testing-library/react';
import { Spinner } from '../../ui/Spinner/Spinner';

describe('Spinner', () => {
    it('renders correctly', () => {
        const { container } = render(<Spinner />);
        expect(container.firstChild).toHaveClass('animate-spin');
    });

    it('applies custom class names', () => {
        const { container } = render(<Spinner className="custom-class" />);
        expect(container.firstChild).toHaveClass('custom-class');
    });
});
