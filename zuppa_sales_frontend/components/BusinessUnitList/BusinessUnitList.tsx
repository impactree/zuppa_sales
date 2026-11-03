'use client';

import { IBusinessUnit } from '@/lib/interface/IAccount.interface';
import { BusinessUnitService } from '@/lib/service';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { IoIosAdd, IoMdAdd } from 'react-icons/io';
import { MdExpandMore } from 'react-icons/md';
import { PiDotsThreeOutlineVertical } from 'react-icons/pi';
import BlockOrUnblockOrDelete from '../BlockOrUnblockOrDelete/BlockOrUnblockOrDelete';
import BusinessUnitForm from '../BusinessUnitForm/BusinessUnitForm';
import { Button } from '../Button/Button';
import { useUser } from '../Context/userProvider';
import { useModal } from '../Modal/Context';
import { ActionType } from '../types';
import './BusinessUnitList.css';

export default function BusinessUnitList({
  slug,
  businessUnits,
}: {
  slug: string;
  businessUnits: IBusinessUnit[] | undefined;
}) {
  const context = useUser();
  const router = useRouter();
  const [actionType, setActionType] = useState<ActionType>(null);
  const [currentBusinessUnit, setCurrentBusinessUnit] = useState<
    IBusinessUnit | undefined
  >();
  const hasAccess = (feature: string) => context?.currentRole?.BUSINESS_UNIT?.includes(feature);
  const hideModal = useModal({});

  const onClose = () => {
    hideModal();
    setCurrentBusinessUnit(undefined);
    setActionType(null);
    router?.refresh();
  };

  const modal = useModal({
    content: (
      <div className="d-flex justify-content-center">
        <BusinessUnitForm
          slug={slug}
          currentBusinessUnit={currentBusinessUnit}
          onClose={onClose}
        />
      </div>
    ),
  });
  const deleteBusinessUnit = async () => {
    if (currentBusinessUnit?.id) {
      const res = await BusinessUnitService.deleteBusinessUnit(
        slug,
        currentBusinessUnit?.id,
      );
      const { success } = res?.data as { success: boolean };
      if (success) {
        toast.success('Business Unit deleted successfully');
        setCurrentBusinessUnit(undefined);
        onClose();
      }
    }
  };

  const deleteModal = useModal({
    content: (
      <BlockOrUnblockOrDelete
        actionType={actionType}
        onConfirm={() => deleteBusinessUnit()}
        onClose={() => onClose()}
        deleteText="Are you sure you want to Delete this Business Unit?"
      />
    ),
  });

  useEffect(() => {
    if (currentBusinessUnit) {
      switch (actionType) {
        case 'Edit':
          modal();
          break;
        case 'Delete':
          deleteModal();
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBusinessUnit]);

  const sites = (
    _sites: IBusinessUnit,
  ) => _sites.sites.sort((a, b) => a.name.length - b.name.length);

  return (
    <div>
      <div className="d-flex justify-content-end">
        {context?.currentRole?.BUSINESS_UNIT?.includes('WRITE') && (
          <Button
            text="Add Business Unit"
            isSolid
            onClick={modal}
            className="btn btn-primary w-100 gap-3"
            prefixIconChildren={<IoIosAdd size={24} />}
          />
        )}
      </div>
      <div className="row mt-4">
        {businessUnits?.map((businessUnit, index: number) => (
          <div className="col-sm-4 mb-1 p-2" key={businessUnit?.id}>
            <div className="card h-100 mb-4" style={{ borderRadius: 12 }}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="m-0 fs-14 fw-500">
                      Business unit
                      {' '}
                      {index + 1}
                    </p>
                    <h5 className="card-title text-break fs-24 fw-600 mt-2">
                      {businessUnit?.name}
                    </h5>
                  </div>
                  <div className="" data-testid="action">
                    {(hasAccess('UPDATE') || hasAccess('DELETE')) && (
                      <Dropdown>
                        <Dropdown.Toggle
                          className="dropdownTitle"
                          data-testid="action"
                        >
                          <PiDotsThreeOutlineVertical
                            color="var(--textdark)"
                            fontSize={32}
                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-css-businessunit-list">
                          {hasAccess('UPDATE') && (
                            <Dropdown.Item
                              data-testid="Edit"
                              onClick={() => {
                                setCurrentBusinessUnit(businessUnit);
                                setActionType('Edit');
                              }}
                              className="mt-2 mb-2"
                            >
                              Edit
                            </Dropdown.Item>
                          )}
                          {hasAccess('DELETE') && businessUnits?.length > 1 && (
                            <Dropdown.Item
                              data-testid="Delete"
                              onClick={() => {
                                setCurrentBusinessUnit(businessUnit);
                                setActionType('Delete');
                              }}
                              className="mt-2 mb-2"
                            >
                              Delete
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                </div>
                <div className="mt-4 mb-2">
                  <p className="m-0 fs-14 fw-500">Sites</p>
                  <div className="card-text mt-2 d-flex justify-content-start flex-wrap">
                    {sites(businessUnit)
                      .slice(0, 5)
                      .map((site) => (
                        <p
                          key={site.id}
                          className="border border-1 border-secondary rounded-pill p-2 ps-3 pe-3 me-2 fs-16 fw-600 text-dark"
                          title={site.name}
                        >
                          {site.name.length > 6
                            ? `${site.name.slice(0, 6)}...`
                            : site.name}
                        </p>
                      ))}
                    {sites(businessUnit)?.length > 5 && (
                      <OverlayTrigger
                        placement="right"
                        overlay={(
                          <Tooltip
                            id="tooltip-standard"
                            className="custom-tooltip"
                          >
                            {sites(businessUnit)
                              ?.slice(5)
                              .map((site, idx) => (
                                <div
                                  key={site?.id}
                                  className=" mb-2 py-1 px-2 rounded-2 fw-semibold"
                                  style={{ background: '#f6f5f3' }}
                                >
                                  {`${idx + 1})${site.name}`}
                                </div>
                              ))}
                          </Tooltip>
                        )}
                      >
                        <div
                          className="d-flex align-items-center fw-semibold fs-13"
                          aria-describedby="tooltip-standard"
                        >
                          <IoMdAdd size={15} />
                          {sites(businessUnit)?.slice(5)?.length}
                          <MdExpandMore size={15} />
                        </div>
                      </OverlayTrigger>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
