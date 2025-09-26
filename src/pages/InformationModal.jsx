import TextModal from '../components/common/TextModal'
import { TEXT_INFORMATION } from '../utils/constants'

export default function InformationModal({ open, dispSel, modalHandle }) {
    return (
        <>
            {open ?
                <TextModal onShow={modalHandle} context={TEXT_INFORMATION[dispSel]} />
                :
                <></>
            }
        </>
    )
}