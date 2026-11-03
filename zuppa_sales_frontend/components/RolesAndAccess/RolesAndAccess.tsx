'use client';

import { IRolesAndAccess } from '@/lib/interface/IRole.interface';
import { RoleService } from '@/lib/service';
import { convertToPascalCase, userRole } from '@/lib/utils';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../Button/Button';
import { useUser } from '../Context/userProvider';
import './rolesAndAccess.css';

export default function RolesAndAccess({
  slug,
  roleAccess,
}: {
  slug: string;
  roleAccess: IRolesAndAccess;
}) {
  const context = useUser();

  useEffect(() => {
    if (context) {
      context?.getRoleAccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getValue = async (
    isChecked: boolean,
    role: string,
    module: string,
    features: string[] | null | undefined,
    value: string,
  ) => {
    const safeFeatures = Array.isArray(features) ? features : [];
    const updatedFeatures = isChecked
      ? Array.from(new Set([...safeFeatures, value]))
      : safeFeatures.filter((feature) => feature !== value);
    const params = { role, module, features: updatedFeatures };
    await RoleService.updateRoles(params, slug);
    context?.getRoleAccess();
  };

  const handleSelectAll = async (
    isChecked: boolean,
    role: string,
    module: string,
  ) => {
    const allFeatures = roleAccess?.feature?.[module] || [];
    const featuresToSet = isChecked ? allFeatures : [];
    const params = { role, module, features: featuresToSet };
    await RoleService.updateRoles(params, slug);
    context?.getRoleAccess();
  };

  const handleReset = async () => {
    const res = await RoleService.resetRoles(slug);
    const { success, message, error } = res?.data as {
      success: boolean;
      message: string;
      error: string;
    };
    if (success) {
      context?.getRoleAccess();
      toast.success(message);
    } else {
      toast.error(error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between pb-5 mb-4">
        <div className="">
          <span className="settings-subtitle">Settings</span>
          <h4 className="fw-700 mb-0">Roles And Access</h4>
        </div>
        <div className=" d-flex gap-4 ">
          <Button
            text="Reset to Default"
            onClick={handleReset}
            className="w-100"
            isBorderButton
          />
        </div>
      </div>
      {roleAccess?.module.map((module: string) => (
        <>
          <div
            key={module}
            style={{ marginBottom: '2rem' }}
            className="table-bg p-3"
          >
            <table className="table">
              <thead>
                <tr>
                  <th className=" py-4">
                    <div className="fs-22 fw-500 textSecondary">
                      {convertToPascalCase(module?.replaceAll('_', ' '))}
                    </div>
                  </th>
                  {roleAccess?.role?.map((role: string) => {
                    const allFeatures = roleAccess?.feature?.[module] || [];
                    const selectedFeatures = context?.roleAccessDetails?.[role]?.[module] || [];
                    const isAllSelected = allFeatures.length > 0
                      && allFeatures.every((f: string) => selectedFeatures.includes(f));
                    return (
                      <th className="text-center py-4" key={role}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <div className="roleCheckbox">
                            <input
                              id={`${module}-${role}`}
                              type="checkbox"
                              checked={isAllSelected}
                              onChange={(e) => handleSelectAll(e.target.checked, role, module)}
                              aria-label={`Select all for 
                            ${convertToPascalCase(role?.replace('_', ' '))} 
                            in ${convertToPascalCase(module?.replaceAll('_', ' '))}`}
                            />
                          </div>
                          <span className="fs-15 fw-semibold letter-spacing">
                            {convertToPascalCase(userRole(role)?.replace('_', ' '))}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {roleAccess?.feature?.[module]?.map((feature: string) => (
                  <tr key={feature} className="tableHover">
                    <th
                      className="fs-15 fw-semibold letter-spacing text-left py-4 mt-3"
                      style={{ minWidth: 160 }}
                    >
                      {convertToPascalCase(
                        feature?.replaceAll('/', ' ')?.replaceAll('_', ' '),
                      )}
                    </th>
                    {roleAccess?.role?.map((role: string) => (
                      // eslint-disable-next-line jsx-a11y/control-has-associated-label
                      <td
                        className="text-center py-4"
                        key={role}
                        style={{ minWidth: 120 }}
                      >
                        <div className="roleCheckbox">
                          <input
                            id={`${module}-${feature}-${role}`}
                            type="checkbox"
                            onChange={(e) => {
                              getValue(
                                e.target.checked,
                                role,
                                module,
                                context?.roleAccessDetails?.[role]?.[module] as
                                  | string[]
                                  | [],
                                feature,
                              );
                            }}
                            checked={
                              context?.roleAccessDetails
                              && context?.roleAccessDetails?.[role]
                              && context?.roleAccessDetails?.[role]?.[module]
                              && context?.roleAccessDetails?.[role]?.[
                                module
                              ]?.includes(feature)
                            }
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr className="textSecondary mt-0 mb-0 border-2" />
        </>
      ))}
    </div>
  );
}
