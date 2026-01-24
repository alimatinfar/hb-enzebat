'use client'

import Card from "@/components/others/Card/Card";
import Button from "@/components/Form/Button/Button";
import ArrowIcon from "@/components/svg/ArrowIcon";
import Link from "next/link";
import getAccessiblePanels from "@/utils/authentication/getAccessiblePanels";


function SelectPanelPage() {

  const accessiblePanels = getAccessiblePanels()

  return (
    <div className='space-y-12'>
      <p className='text-3xl font-bold text-center'>
        پنل کاربری خود را انتخاب نمایید
      </p>

      <div className='flex flex-col space-y-4'>
        {accessiblePanels.map(panel => (
          <Link
            key={panel.link}
            href={panel.link}
          >
            <Card
              className='flex items-center justify-between'
            >
              <p className='text-center text-2xl font-semibold text-primary'>
                {panel.label}
              </p>

              <div>
                <Button
                  variant='outlined' justIcon
                >
                  <ArrowIcon
                    className='rotate-90' textColor='text-primary'
                  />
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SelectPanelPage;