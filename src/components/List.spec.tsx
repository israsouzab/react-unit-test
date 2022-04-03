import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './List'

describe('App component', () => {
   it('should render list items', () => {
      const { getByText, queryByText, rerender, unmount } = render(<List initialItems={['Diego', 'Rodz', 'Isra']} />)

      expect(getByText('Diego')).toBeInTheDocument()
      expect(getByText('Rodz')).toBeInTheDocument()
      expect(getByText('Isra')).toBeInTheDocument()

      unmount()
      rerender(<List initialItems={['Julia']} />)

      expect(getByText('Julia')).toBeInTheDocument()
      expect(queryByText('Isra')).not.toBeInTheDocument()
   })

   it('should be able to add new item to the list', async () => {
      const { getByText, getByPlaceholderText } = render(<List initialItems={['Diego', 'Rodz', 'Isra']} />)

      //userEvent@14 usa essa sintaxe
      const user = userEvent.setup()

      const inputElement = getByPlaceholderText('Novo item')
      const addButton = getByText('Adicionar')

      await user.type(inputElement, 'Velho')
      await user.click(addButton)

      await waitFor(() => {
         expect(getByText('Velho')).toBeInTheDocument()
      })
   })

   it('should be able to remove item from the list', async () => {
      const { queryByText, getAllByText, debug } = render(<List initialItems={['Diego', 'Rodz', 'Isra']} />)

      //userEvent@14 usa essa sintaxe
      const user = userEvent.setup()

      const removeButtons = getAllByText('Remover')

      await user.click(removeButtons[0])

      await waitForElementToBeRemoved(() => {
         return queryByText('Diego')
      })

   })
})